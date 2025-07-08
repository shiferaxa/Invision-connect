# InvisionConnect: Referral Portal Web Application

InvisionConnect is a scalable, customizable referral portal web application designed for businesses to manage user referrals and drive growth. Built as a modular Infrastructure as a Service (IaaS) solution, it enables companies to deploy their own branded referral system with ease. The project includes a non-branded template for resale and a branded version for [invisionwireless.com](https://invisionwireless.com).

## Features
- **User Authentication**: Secure sign-up and sign-in via AWS Cognito.
- **Referral Tracking**: Generate unique referral codes and track referred users in AWS DynamoDB.
- **Responsive UI**: Modern React frontend with a user-friendly dashboard for referral management.
- **Infrastructure as Code**: Fully defined with Terraform for easy deployment and customization on AWS (VPC, EC2, Route 53, ACM).
- **Modular Design**: Configurable variables for branding, domains, and styling to suit any business.

## Tech Stack
- **Backend**: Node.js/Express with AWS SDK for Cognito and DynamoDB integration.
- **Frontend**: React with AWS Amplify for seamless authentication and hosting.
- **Database**: AWS DynamoDB for efficient referral data storage.
- **Infrastructure**: Terraform scripts for AWS VPC, EC2, Route 53, and SSL setup.
- **Tools**: Gitpod, GitHub, AWS CLI, Amplify CLI.

## Getting Started
1. Open in Gitpod: `https://gitpod.io/#https://github.com/your-username/invisionconnect`
2. Install dependencies: `cd backend && npm install; cd ../frontend && npm install`
3. Configure AWS CLI and Amplify CLI in Gitpod.
4. Customize `terraform/variables.tf` for your domain and branding.
5. Deploy infrastructure: `cd terraform && terraform init && terraform apply`
6. Follow `docs/setup_guide.md` for detailed deployment instructions.

## Documentation
- `docs/infrastructure.md`: AWS infrastructure setup with Terraform.
- `docs/api.md`: Backend API specifications.
- `docs/setup_guide.md`: Guide for businesses to deploy and customize.
- `docs/deployment.md`: Domain and SSL configuration details.

## Use Cases
- **Businesses**: Deploy a branded referral portal to boost customer acquisition.
- **IaaS Resale**: Purchase the non-branded template to launch your own referral platform with minimal setup.

## License
Proprietary. Contact [admin@invisionwireless.com] for licensing or purchase inquiries.
