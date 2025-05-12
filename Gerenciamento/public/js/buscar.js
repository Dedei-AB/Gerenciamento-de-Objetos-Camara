const objetos = async () => {
  const res = await fetch("/dados-buscar");
  const dados = await res.json();
  return dados;
};

objetos.forEach((element) => {
  console.log(element.Complemento);
});
