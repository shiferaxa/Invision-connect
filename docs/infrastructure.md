# Infrastructure Setup

## VPC and EC2 Configuration
- **VPC**: Created with CIDR 10.0.0.0/16, two public subnets (10.0.0.0/24, 10.0.1.0/24), two private subnets (10.0.2.0/24, 10.0.3.0/24), and an Internet Gateway.
- **EC2**: t2.micro instance in public subnet with Amazon Linux 2 AMI, Node.js 16 installed via NodeSource repository.
- **Security Group**: Allows HTTP (80), HTTPS (443), SSH (22), and ICMP (ping) ingress, all egress traffic.
- **Key Pair**: Uses `invisionconnect-key` for SSH access.
- **Public IP**: Enabled with `associate_public_ip_address = true`.

### Setup Steps
1. Generate SSH key pair in Gitpod: `ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""`.
2. Upload public key to AWS: `aws ec2 import-key-pair --key-name invisionconnect-key --public-key-material fileb://~/.ssh/id_rsa.pub`.
3. Run `terraform init` and `terraform apply` in `terraform/`.
4. Find EC2 public IP: `terraform output ec2_public_ip` or check EC2 Console.
5. Test connectivity: `ping -c 5 <EC2_IP>`.
6. SSH into EC2: `ssh -i ~/.ssh/id_rsa ec2-user@<EC2_IP>`.
7. Verify Node.js installation: `node -v` and `npm -v`. Check `/home/ec2-user/install.log` for logs.

### Notes
- Uses Node.js 16 via NodeSource for compatibility with Amazon Linux 2’s glibc 2.26.
- Restrict SSH and ICMP access to specific IPs in production.
- Monitor EC2 Free Tier usage.