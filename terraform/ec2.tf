data "aws_ami" "latest_amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

resource "aws_security_group" "web" {
    vpc_id = aws_vpc.main.id

    ingress {
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
}

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "${var.project_name}-web-sg"
    }
}

resource "aws_instance" "backend" {
    ami                         = data.aws_ami.latest_amazon_linux.id
    instance_type               = "t2.micro"
    subnet_id                   = aws_subnet.public[0].id
    vpc_security_group_ids      = [aws_security_group.web.id]
    associate_public_ip_address = true

    user_data = <<-EOF
        #!/bin/bash
        sudo yum update -y
        sudo yum install -y nodejs npm
        EOF
    
    tags = {
        Name = "${var.project_name}-backend"
    }
}

output "ec2_public_ip" {
    value = aws_instance.backend.public_ip

}
