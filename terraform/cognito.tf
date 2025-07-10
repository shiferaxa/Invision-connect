# terraform/cognito.tf

resource "aws_cognito_user_pool" "main" {
    name = "${var.project_name}-user-pool"

    password_policy {
        minimum_length    = 8
        require_uppercase = true
        require_lowercase = true
        require_numbers   = true
        require_symbols   = false
    }

    username_attributes = ["email"]
    auto_verified_attributes = ["email"]

    schema {
        name = "name"
        attribute_data_type = "String"
        required = false
    }

    schema {
        name = "referral_code"
        attribute_data_type = "String"
        required = false
    }

    tags = {
        Name = "${var.project_name}-user-pool"
    }
}

resource "aws_cognito_user_pool_client" "main" {
    name = "${var.project_name}-client"
    user_pool_id = aws_cognito_user_pool.main.id

    generate_secret = false
    explicit_auth_flows = ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]

   
}

resource "aws_cognito_identity_pool" "main" {
  
    identity_pool_name = "${var.project_name}-identity-pool"
    allow_unauthenticated_identities = false

    cognito_identity_providers {
        client_id               = aws_cognito_user_pool_client.main.id
        provider_name           = aws_cognito_user_pool.main.endpoint
        server_side_token_check = false
    }
}

output "user_pool_id" {
    value = aws_cognito_user_pool.main.id
}

output "user_pool_client_id" {
    value = aws_cognito_user_pool_client.main.id
}

output "identity_pool_id" {
  value = aws_cognito_identity_pool.main.id
}