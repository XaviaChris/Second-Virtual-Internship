import BooksRow from '../components/BooksRow.jsx';
import Selected from '../components/Selected.jsx';


function ForYou() {
  

  return (
    <div>
  <Selected />
 <BooksRow
  title="Recommended for you"
  subtitle="We think you’ll like these"
  status="recommended"
/>

<BooksRow
  title="Suggested books"
  subtitle="Browse those books"
  status="suggested"
/>
   </div>
  );
}

export default ForYou