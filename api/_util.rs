use regex::Regex;
use reqwest;
use serde::{Deserialize, Serialize};
use std::convert::TryFrom;
use url::Url;

type Rate = u32;

#[derive(Copy, Clone, Debug, PartialEq)]
pub enum ContestType {
    Algorithm,
    Heuristic,
}

impl TryFrom<&str> for ContestType {
    type Error = ();

    fn try_from(value: &str) -> Result<Self, Self::Error> {
        match value.to_ascii_lowercase().as_ref() {
            "algorithm" => Ok(Self::Algorithm),
            "heuristic" => Ok(Self::Heuristic),
            _ => Err(()),
        }
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct UserId(String);

impl TryFrom<&str> for UserId {
    type Error = ();

    fn try_from(value: &str) -> Result<Self, Self::Error> {
        let value = value.trim();
        let re = Regex::new(r"\A[_a-zA-Z0-9]{3,16}\z").unwrap();
        if re.is_match(value) {
            Ok(UserId(value.into()))
        } else {
            Err(())
        }
    }
}

#[derive(Deserialize)]
#[serde(rename_all = "PascalCase")]
struct ContestHistoryResponse {
    is_rated: bool,
    new_rating: u32,
}

pub fn get_ac_rate(
    user_id: &UserId,
    contest_type: ContestType,
) -> Result<Rate, Box<dyn std::error::Error>> {
    let history_list = reqwest::blocking::get(contest_history_url(user_id, contest_type))?
        .json::<Vec<ContestHistoryResponse>>()?;
    for h in history_list.into_iter().rev() {
        if h.is_rated {
            return Ok(h.new_rating);
        }
    }
    Ok(0)
}

#[derive(Serialize, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ShieldsResponseBody {
    schema_version: u32,
    label: String,
    message: String,
    color: String,
}

impl ShieldsResponseBody {
    pub fn new_ac_rate_response(contest_type: ContestType, rate: Rate) -> Self {
        let label = format!(
            "AtCoder{}",
            match contest_type {
                ContestType::Algorithm => "Ⓐ",
                ContestType::Heuristic => "Ⓗ",
            }
        );
        let message = rate.to_string();
        let color = match rate {
            0 => "000000",
            1..=399 => "808080",
            400..=799 => "804000",
            800..=1199 => "008000",
            1200..=1599 => "00C0C0",
            1600..=1999 => "0000FF",
            2000..=2399 => "C0C000",
            2400..=2799 => "FF8000",
            _ => "FF0000",
        }
        .to_string();

        Self {
            schema_version: 1,
            label,
            message,
            color,
        }
    }
}

fn contest_history_url(user_id: &UserId, contest_type: ContestType) -> Url {
    let mut params = Vec::new();
    match contest_type {
        ContestType::Heuristic => {
            params.push(("contestType", "heuristic"));
        }
        _ => {}
    };
    Url::parse_with_params(
        &format!("https://atcoder.jp/users/{}/history/json", user_id.0),
        &params,
    )
    .unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;
    use rstest::*;

    mod contest_type {
        use super::*;

        #[test]
        fn try_from_string() {
            assert_eq!(
                ContestType::try_from("algorithm"),
                Ok(ContestType::Algorithm)
            );
            assert_eq!(
                ContestType::try_from("Algorithm"),
                Ok(ContestType::Algorithm)
            );
            assert_eq!(
                ContestType::try_from("heuristic"),
                Ok(ContestType::Heuristic)
            );
            assert_eq!(
                ContestType::try_from("Heuristic"),
                Ok(ContestType::Heuristic)
            );
            assert_eq!(ContestType::try_from("invalid_type"), Err(()));
        }
    }

    mod user_id {
        use super::*;

        #[test]
        fn try_from_string() {
            assert_eq!(UserId::try_from("abc"), Ok(UserId("abc".into())));
            assert_eq!(UserId::try_from("Abc"), Ok(UserId("Abc".into())));
            assert_eq!(UserId::try_from("123"), Ok(UserId("123".into())));
            assert_eq!(UserId::try_from("abc123"), Ok(UserId("abc123".into())));
            assert_eq!(
                UserId::try_from("0123456789123456"),
                Ok(UserId("0123456789123456".into()))
            );
            assert_eq!(UserId::try_from("ab"), Err(()));
            assert_eq!(UserId::try_from("01234567891234567"), Err(()));
        }
    }

    mod shields_response_body {
        use super::*;

        #[rstest]
        #[case(0, "000000")]
        #[case(1, "808080")]
        #[case(399, "808080")]
        #[case(400, "804000")]
        #[case(799, "804000")]
        #[case(800, "008000")]
        #[case(1199, "008000")]
        #[case(1200, "00C0C0")]
        #[case(1599, "00C0C0")]
        #[case(1600, "0000FF")]
        #[case(1999, "0000FF")]
        #[case(2000, "C0C000")]
        #[case(2399, "C0C000")]
        #[case(2400, "FF8000")]
        #[case(2799, "FF8000")]
        #[case(2800, "FF0000")]
        #[case(4200, "FF0000")]
        fn new_ac_rate_response_algorithm(#[case] rate: u32, #[case] color: &str) {
            assert_eq!(
                ShieldsResponseBody::new_ac_rate_response(ContestType::Algorithm, rate),
                ShieldsResponseBody {
                    schema_version: 1,
                    label: "AtCoderⒶ".to_string(),
                    message: rate.to_string(),
                    color: color.to_string(),
                }
            );
        }

        #[rstest]
        #[case(0, "000000")]
        #[case(1, "808080")]
        #[case(399, "808080")]
        #[case(400, "804000")]
        #[case(799, "804000")]
        #[case(800, "008000")]
        #[case(1199, "008000")]
        #[case(1200, "00C0C0")]
        #[case(1599, "00C0C0")]
        #[case(1600, "0000FF")]
        #[case(1999, "0000FF")]
        #[case(2000, "C0C000")]
        #[case(2399, "C0C000")]
        #[case(2400, "FF8000")]
        #[case(2799, "FF8000")]
        #[case(2800, "FF0000")]
        #[case(4200, "FF0000")]
        fn new_ac_rate_response_heuristic(#[case] rate: u32, #[case] color: &str) {
            assert_eq!(
                ShieldsResponseBody::new_ac_rate_response(ContestType::Heuristic, rate),
                ShieldsResponseBody {
                    schema_version: 1,
                    label: "AtCoderⒽ".to_string(),
                    message: rate.to_string(),
                    color: color.to_string(),
                }
            );
        }
    }
}
