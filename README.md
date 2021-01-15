# minilink

Project of a link reducer with HTML, CSS and JS Frontend - Backend and API in Node JS - Mysql Hosted on an AWS EC2

Request Examples

POST Example:

```
curl -X POST "http://localhost:8080/links" 
     -H  "accept: application/json
     -H  "Content-Type: application/json" 
```
```
json body
{
    "nome": "Novo Link",
    "url": "https://novolink.com.br",
    "minilink": "novolink"
}
```
```
response:
{
    "id_link": 70
}
```
GET All Example:
```
curl -X GET "http://localhost:8080/links" 
     -H  "accept: application/json
     -H  "Content-Type: application/json" 
```

```
json
{
    "response": [
        {
            "id_link": 5,
            "nome": "Novo Link",
            "url": "https://novolink.com",
            "minilink": "novolink",
            "status": 1
        }
        ...
    ]    
}     
```
GET One Example:
```
curl -X GET "http://localhost:8080/links" 
     -H  "accept: application/json
     -H  "Content-Type: application/json" 
     -d "{\"id_link\": 5}"
```
```
json
{
    "response": [
        {
            "id_link": 5,
            "nome": "Novo Link",
            "url": "https://novolink.com",
            "minilink": "novolink",
            "status": 1
        }
}     
```
