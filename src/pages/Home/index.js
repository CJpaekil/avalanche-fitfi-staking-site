import Stake from "./Stake";
import About from "./About";
import Rules from "./Rules";
import Buy from "./Buy";
const Home = () => {
    return (
        <>
            <div>
                <Stake />
            </div>
            <div>
                <About />
            </div>
            <div>
                <Rules />
            </div>
            <div>
                <Buy />
            </div>
        </>
    )
}

export default Home;