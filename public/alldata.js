function AllData(){
    //console.log(name, email, password, deposit, withdraw, balance);
    const [data, setData] = React.useState([]);

    // executes once, upon loading
  React.useEffect(() => {
    // fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(apiData => {
        if (Array.isArray(apiData)) {
          console.log(apiData);
          setData(apiData);
        } else {
          console.error('API response is not an array:', apiData);
          // Handle the case where the API response is not an array
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        //console.log('API Data in case of error:', apiData);
        // Handle the error as needed
      });
  }, []);

    return (
        <div className="alldata">
        <p className="card-description">All accounts data is listed here: </p>
        <Card
          bgcolor="info"
          txtcolor="white"
          header="All Data"
          body= {(
            <>
                <table style={{ width: '100%' }} >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(account => ( 
                            <tr key={account._id}>
                                <td>{account._id}</td>
                                <td>{account.name}</td>
                                <td>{account.email}</td>
                                <td>{account.password}</td>
                                <td>{account.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
          )}
        />
        </div>
    );
}