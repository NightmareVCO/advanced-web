#!/usr/bin/env bash
echo "Instalando estructura basica para clase virtualhost y proxy reverso"

sudo dd if=/dev/zero of=/swapfile count=2048 bs=1MiB
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

sudo apt-get update
sudo apt-get install ca-certificates curl certbot zip unzip nmap apache2 certbot tree
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo service apache2 start
sudo a2enmod proxy proxy_html proxy_http ssl
sudo systemctl restart apache2
sudo service apache2 stop

sudo certbot certonly -m  admin@mockify.com -d mockify.steven-mateo.systems

git clone https://github.com/NightmareVCO/advanced-web.git

cd advanced-web/practica-6

sudo cp ~/advanced-web/practica-6/httpd.conf /etc/apache2/sites-available/httpd.conf
sudo a2ensite httpd.conf
sudo service apache2 start
sudo systemctl reload apache2

echo "Estructura basica instalada"