FROM nginx

#----------------------------------------------
# nginx default setting
#----------------------------------------------
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx-templates/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/html/index.html /usr/share/nginx/html/index.html


#----------------------------------------------
# nginx dweb.dfpcen.com setting
#----------------------------------------------
COPY nginx/nginx-templates/front.dfpcen.com.conf.template /etc/nginx/templates/front.dfpcen.com.conf.template
COPY dist /usr/share/nginx/html/front.dfpcen.com


WORKDIR /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]