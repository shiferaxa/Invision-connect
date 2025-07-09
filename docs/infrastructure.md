# Infrastructure Setup

## VPC and EC2 Configuration
- **VPC**: Created with CIDR 10.0.0.0/16, two public subnets (10.0.0.0/24, 10.0.1.0/24), two private subnets (10.0.2.0/24, 10.0.3.0/24), and an Internet Gateway.
- **EC2**: t2.micro instance in public subnet with Amazon Linux 2 AMI, Node.js installed via user data script.
- **Security Group**: Allows HTTP (80), HTTPS (443), and SSH (22) ingress, all egress traffic.

### Setup Steps
1. Run `terraform init` and `terraform apply` in `terraform/`.
2. SSH into EC2 using public IP from Terraform output.
3. Verify Node.js installation with `node -v`.

### Notes
- Restrict SSH access to specific IPs in production.
- Monitor EC2 Free Tier usage.