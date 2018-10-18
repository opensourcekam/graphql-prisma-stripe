import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import initApollo from "./graphql/initApollo";

ReactDOM.render(initApollo(App), document.getElementById("root"));

serviceWorker.unregister();
