# terraform/dynamodb.tf

resource "aws_dynamodb_table" "referrals" {
  name           = "${var.project_name}-referrals"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "user_id"

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "referral_code"
    type = "S"
  }

  global_secondary_index {
    name               = "ReferralCodeIndex"
    hash_key           = "referral_code"
    projection_type    = "ALL"
  }

  tags = {
    Name = "${var.project_name}-referrals"
  }
}