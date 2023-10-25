import { useDispatch } from "react-redux";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerName(e.target.trainerName.value));
    navigate("/pokedex");
  };

  return (
    <main className="grid grid-rows-[1fr_auto] justify-center items-center h-screen w-screen">
      <section className="flex flex-col items-center mx-auto">
        <div className="max-w-[700px] text-center grid grid-cols-1 items-center justify-center gap-6">
          <div>
            <img
              className="w-[250px] sm:w-[350px] mx-auto object-cover"
              src="/images/logo.png"
              alt="Logo"
            />
          </div>

          <div>
            <h3 className="text-4xl text-[#DD1A1A] font-bold">Hi trainer!</h3>
            <p>To start, give your name:</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              name="trainerName"
              type="text"
              placeholder="Your name..."
              className="bg-white shadow-md h-10 p-2 text-sm"
            />
            <button className="bg-red-600 text-white py-2 px-4 h-10 shadow-md hover:bg-red-400 hover:text-black">
              Start!
            </button>
          </form>
        </div>
      </section>

      <footer className="fixed left-0 right-0 bottom-0 h-20">
        <div className="absolute bottom-0 w-full h-[100%] bg-[#DD1A1A]"></div>

        <div className="absolute bottom-0 w-full h-[40%] bg-black"></div>
        
        <div className="w-full absolute bottom-3 ">
          <img className=" w-14 h-14 mx-auto" src="/images/poke1.svg" alt="" />
        </div>
      </footer>
    </main>
  );
};

export default Home;
