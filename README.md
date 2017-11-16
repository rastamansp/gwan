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

## Exemplo de mutation: Cadastrar Usuario Novo ##
```
mutation criaUsuarioMutation {
  addUser(
  	id: "100001062480512",
  	nome: "Barbara Umbelino de Almeida",
  	imagem: "https://graph.facebook.com/100001062480512/picture?type=large",
    dataNascimento: "31/12/9999",
  	sexo: "female",
  	pais: "Brasil",
  	estado: "SP",
  	cidade: "São Paulo",
  	whatsapp: "+55 (11) 9999(-9999",
  	email: "email@gmail.com"
  ) {
    id
    nome
    imagem
    dataNascimento
    sexo
    estado
    cidade
    whatsapp
    email
  }
}
```

## Exemplo de mutation: Editar Usuario existente ##
```
mutation criaUsuarioMutation {
  addUser(
  	id: "100001062480512",
  	nome: "Barbara Umbelino de Almeida",
  	imagem: "https://graph.facebook.com/100001062480512/picture?type=large",
    dataNascimento: "31/12/9999",
  	sexo: "female",
  	pais: "Brasil",
  	estado: "SP",
  	cidade: "São Paulo",
  	whatsapp: "+55 (11) 9999(-9999",
  	email: "email@gmail.com"
  ) {
    id
    nome
    imagem
    dataNascimento
    sexo
    estado
    cidade
    whatsapp
    email
  }
}
```