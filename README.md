# gwan
FullStack Project


## Exemplo de request: listar usuarios ##

```
{
  user {
    id
    nome
    imagem
    dataNascimento    
    sexo
    whatsapp
    pais
    estado
    cidade
    email 
  }
}
```

## Exemplo de request: busca de usuario ##

```
{
  user(id: "100000173003578") {
    id
    nome
    imagem
    dataNascimento    
    sexo
    whatsapp
    pais
    estado
    cidade
    email 
  }
}
```
