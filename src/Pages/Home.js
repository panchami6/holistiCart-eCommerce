import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
    return(
        <div>
            <div class="landing-page">
                <div class="landing-page-img">
                    <img src="https://images.pexels.com/photos/416747/pexels-photo-416747.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="first look" />
                </div>
                <div class="landing-page-shop">
                    <h2>Explore the fitness world</h2>
                    <Link className="btn-primary" to="/Products"> <button className="btn-primary">Shop now</button> </Link> 
                </div>
            </div>
        </div>
    )
}