import { app } from "./app";
import { envVariables } from "./config/envVariables";

app.get('/', (req, res) => {
	res.send('test');
});

app.listen(envVariables.port, () => {
	console.log(`App listening on port ${envVariables.port}`)
});
