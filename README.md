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

## Exemplo de mutation: cadastro de novo usuario ##
```
mutation criaUsuarioMutation {
  addUser(
  	id: "100001062480512",
  	nome: "Barbara Umbelino de Almeida",
  	imagem: "https://graph.facebook.com/100001062480512/picture?type=large",
		dataNascimento: "01/09/1987",
  	sexo: "female",
  	pais: "Brasil",
  	estado: "SP",
  	cidade: "São Paulo",
  	whatsapp: "+55 (11) 98722-1050",
  	email: "barbaraumbelino@gmail.com"
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