server {
    listen 80;
    listen [::]:80;

    root /var/www/vernonmullen.com/html;
    index index.html index.htm index.nginx-debian.html;

    server_name vernonmullen.com www.vernonmullen.com;

    location / {
        try_files $uri $uri/ =404;
    }
}
