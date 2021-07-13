import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
    return(
        <div>
            <div class="landing-page">
                <div className = "landing-page-top">
                    <div>
                        <img className = "landing-page-photo" src = "https://images.unsplash.com/photo-1614634053434-1729f6ac6bd6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=558&q=80" alt="fit woman" />
                    </div>
                    <div className = "landing-page-intro">
                        <h1>One stop destination to start your fitness journey</h1>
                        <Link className="btn-primary" to="/Products"><button className="btn-primary">Shop Now</button></Link>
                    </div>
                    <div>
                        <img className = "landing-page-photo" src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Z3ltfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="fit man"/>
                    </div>
                </div>
                <div className = "landing-page-categories">
                    <div className = "category-women">
                        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RlzLMj9sEcCzc6QHMJNNqppvXI-9i9iZzQ&usqp=CAU" alt= "categories-women" />
                        <Link className = "categories" to="/Products"><button>Shop Now ➜  </button></Link>
                    </div>
                    <div className = "category-women">
                        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfpjLaSzsqr7eGJkjooEz_Te81Me18zRP_6g&usqp=CAU" alt= "categories-women" />
                        <Link className = "categories" to="/Products"><button>Shop Now ➜  </button></Link>
                    </div>
                    <div className = "category-women">
                        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHaa2dXIPkMzK2SeFb0hx9P3ePfqaBXkRIg&usqp=CAU" alt= "categories-women" />
                        <Link className = "categories" to="/Products"><button>Shop Now ➜  </button></Link>
                    </div>
                </div>
                <div className = "recommendations">
                    <h3>Recommended For You</h3>
                    <div className = "recommendation-cards">
                        <div className = "category-women">
                            <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RlzLMj9sEcCzc6QHMJNNqppvXI-9i9iZzQ&usqp=CAU" alt= "categories-women" />
                            <Link className = "categories" to="/Products"><button>Shop Now ➜  </button></Link>
                        </div>
                        <div className = "category-women">
                            <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfpjLaSzsqr7eGJkjooEz_Te81Me18zRP_6g&usqp=CAU" alt= "categories-women" />
                            <Link className = "categories" to="/Products"><button>Shop Now ➜  </button></Link>
                        </div>
                        <div className = "category-women">
                            <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHaa2dXIPkMzK2SeFb0hx9P3ePfqaBXkRIg&usqp=CAU" alt= "categories-women" />
                            <Link className = "categories" to="/Products"><button>Shop Now ➜  </button></Link>
                        </div>
                        <div className = "category-women">
                            <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RlzLMj9sEcCzc6QHMJNNqppvXI-9i9iZzQ&usqp=CAU" alt= "categories-women" />
                            <Link className = "categories" to="/Products"><button>Shop Now ➜  </button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}