function Home(){
  return (
    <Card
      txtcolor="black"
      header="Bad Bank"
      headerClassName="CardHeader"
      width="325px"
      title="Welcome to Bad Bank"
      text-align= "center"
      text="Keeping your Bad Money safe since 2024!"
      body={(<img src="money.jpg" className="img-fluid" alt="Responsive image"/>)}
      
    />
  );
}
