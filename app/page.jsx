import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "./components/SearchBar";
import TableList from "./components/Table";

export default function Home() {
  return (
    <main>
     <SearchBar /> 
     <TableList /> 
    </main>
  ); 
}
