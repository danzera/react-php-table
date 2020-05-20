FROM ubuntu:16.04

ENV LANG="en_US.UTF-8" \
    LC_ALL="en_US.UTF-8" \
    LANGUAGE="en_US.UTF-8" \
    TERM="xterm" \
    DEBIAN_FRONTEND="noninteractive" \
    NODE_VERSION=10.13.0 \
    YARN_VERSION=1.22.4 \
    COMPOSER_ALLOW_SUPERUSER=1

EXPOSE 80
WORKDIR /app

RUN apt-get update -q && \
    apt-get install -qy software-properties-common locales locales-all && \
    export LC_ALL=en_US.UTF-8 && \
    export LANG=en_US.UTF-8 && \
    add-apt-repository ppa:ondrej/php && \
    apt-get update -q && \
    apt-get -yqq install ssh && \
    apt-get install --no-install-recommends -qy \
        build-essential \
        ca-certificates \
        cron \
        curl \
        nano \
        vim \
        nginx \
        git \
        zip \
        graphviz \
        mysql-client \
        php7.3 \
        php7.3-bcmath \
        php7.3-curl \
        php7.3-fpm \
        php7.3-gd \
        php7.3-iconv \
        php7.3-intl \
        php7.3-json \
        php7.3-mbstring \
        php7.3-mysql \
        php7.3-pdo \
        php7.3-phar \
        php7.3-soap\
        php7.3-sqlite \
        php7.3-xdebug \
        php7.3-xml \
        php7.3-zip \
        php-apcu \
        supervisor \
        tzdata \
        apt-transport-https \
        pdftk \
        wget && \
    phpdismod xdebug && \

    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \

    cp /usr/share/zoneinfo/America/Los_Angeles /etc/localtime && echo "America/Los_Angeles" > /etc/timezone && \

    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \

    curl -L -o /tmp/nodejs.tar.gz https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz && \
    tar xfvz /tmp/nodejs.tar.gz -C /usr/local --strip-components=1 && \
    rm -f /tmp/nodejs.tar.gz && \
    mkdir /run/php

RUN curl -L -o /tmp/yarn.deb https://github.com/yarnpkg/yarn/releases/download/v${YARN_VERSION}/yarn_${YARN_VERSION}_all.deb && \
        dpkg -i /tmp/yarn.deb

COPY php.ini /etc/php/7.3/cli/conf.d/50-setting.ini
COPY php.ini /etc/php/7.3/fpm/conf.d/50-setting.ini
COPY pool.conf /etc/php/7.3/fpm/pool.d/www.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY symfony.conf /etc/nginx/symfony.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
