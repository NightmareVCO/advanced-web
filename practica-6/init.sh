#!/usr/bin/env bash
echo "Instalando estructura basica para clase virtualhost y proxy reverso"

sudo dd if=/dev/zero of=/swapfile count=2048 bs=1MiB
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

sudo apt update && sudo apt -y install certbot docker

git clone https://github.com/NightmareVCO/advanced-web.git

cd practica-6/

sudo certbot certonly

sudo systemctl start docker

sudo docker compose up -d

echo "Estructura basica instalada"