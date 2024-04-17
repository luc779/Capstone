const loginApiCall = async (username: string, password: string): Promise<any> => {
    console.log('running wiht input:' + username + " " + password)
    const url = 'https://ajdg3owxqe.execute-api.us-west-2.amazonaws.com/test/SignIn?username='+ username +'&password=' + password;
    console.log(url)
    const apiKey = '5CKGXHFWSX8pz21XwgJtC1V18Fi6k9Mnb73Yl3E3';

    const requestOptions = {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
        }
    };
    console.log(requestOptions)

    try {
        const res = await fetch(url, requestOptions);
        console.log('here')
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};
export default loginApiCall;