export const questionBank = {
  History: [
    { id: "H0001", category: "History", question: "Who was the first President of Cameroon?", answers: ["Ahmadou Ahidjo", "Paul Biya", "Ruben Um Nyobè", "John Ngu Foncha"], correct: 0 },
    { id: "H0002", category: "History", question: "Which ancient civilization built the pyramids of Giza?", answers: ["Romans", "Egyptians", "Greeks", "Persians"], correct: 1 },
    { id: "H0003", category: "History", question: "Who was the first emperor of Rome?", answers: ["Julius Caesar", "Augustus", "Nero", "Constantine"], correct: 1 },
    { id: "H0004", category: "History", question: "Which country gifted the Statue of Liberty to the United States?", answers: ["France", "Spain", "Italy", "Germany"], correct: 0 },
    { id: "H0005", category: "History", question: "Who led India's independence movement through nonviolent resistance?", answers: ["Nelson Mandela", "Mahatma Gandhi", "Winston Churchill", "Napoleon"], correct: 1 },
    { id: "H0006", category: "History", question: "The Great Wall is located in which country?", answers: ["Japan", "China", "Korea", "Mongolia"], correct: 1 },
    { id: "H0007", category: "History", question: "Who was the first President of the United States?", answers: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correct: 1 },
    { id: "H0008", category: "History", question: "Which empire was ruled by Mansa Musa?", answers: ["Roman Empire", "Mali Empire", "Ottoman Empire", "British Empire"], correct: 1 },
    { id: "H0009", category: "History", question: "In which year did World War II end?", answers: ["1945", "1939", "1950", "1918"], correct: 0 },
    { id: "H0010", category: "History", question: "Who was known as the founder of the Mongol Empire?", answers: ["Genghis Khan", "Alexander the Great", "Julius Caesar", "Napoleon"], correct: 0 },
  ],
  Bible: [
    { id: "B0001", category: "Bible", question: "Who built the ark according to the Bible?", answers: ["Noah", "Moses", "Abraham", "David"], correct: 0 },
    { id: "B0002", category: "Bible", question: "Who was the first man created by God?", answers: ["Adam", "Cain", "Abel", "Isaac"], correct: 0 },
    { id: "B0003", category: "Bible", question: "Who led the Israelites out of Egypt?", answers: ["Joseph", "Moses", "Joshua", "Samuel"], correct: 1 },
    { id: "B0004", category: "Bible", question: "How many disciples did Jesus have?", answers: ["10", "12", "7", "40"], correct: 1 },
    { id: "B0005", category: "Bible", question: "Who defeated Goliath?", answers: ["Saul", "David", "Solomon", "Peter"], correct: 1 },
    { id: "B0006", category: "Bible", question: "Where was Jesus born?", answers: ["Jerusalem", "Bethlehem", "Nazareth", "Rome"], correct: 1 },
    { id: "B0007", category: "Bible", question: "Who betrayed Jesus?", answers: ["Peter", "John", "Judas Iscariot", "Thomas"], correct: 2 },
    { id: "B0008", category: "Bible", question: "What is the first book of the Bible?", answers: ["Genesis", "Exodus", "Matthew", "Psalms"], correct: 0 },
    { id: "B0009", category: "Bible", question: "Who was swallowed by a great fish?", answers: ["Jonah", "Paul", "Elijah", "Daniel"], correct: 0 },
    { id: "B0010", category: "Bible", question: "Who received the Ten Commandments from God?", answers: ["Moses", "David", "Abraham", "Solomon"], correct: 0 },
  ],
  Science: [
    { id: "S0001", category: "Science", question: "What planet is known as the Red Planet?", answers: ["Mars", "Earth", "Jupiter", "Venus"], correct: 0 },
    { id: "S0002", category: "Science", question: "What gas do humans need to breathe to survive?", answers: ["Carbon dioxide", "Oxygen", "Hydrogen", "Nitrogen"], correct: 1 },
    { id: "S0003", category: "Science", question: "What is the largest organ in the human body?", answers: ["Heart", "Brain", "Skin", "Liver"], correct: 2 },
    { id: "S0004", category: "Science", question: "How many legs does an insect have?", answers: ["4", "6", "8", "10"], correct: 1 },
    { id: "S0005", category: "Science", question: "What force keeps us on the ground?", answers: ["Magnetism", "Gravity", "Electricity", "Friction"], correct: 1 },
  ],
  Geography: [
    { id: "G0001", category: "Geography", question: "What is the largest continent in the world?", answers: ["Africa", "Asia", "Europe", "America"], correct: 1 },
    { id: "G0002", category: "Geography", question: "What is the capital city of France?", answers: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
    { id: "G0003", category: "Geography", question: "Which ocean is the largest in the world?", answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], correct: 2 },
    { id: "G0004", category: "Geography", question: "Which country has the largest population in Africa?", answers: ["Nigeria", "Egypt", "South Africa", "Kenya"], correct: 0 },
    { id: "G0005", category: "Geography", question: "Mount Everest is located in which mountain range?", answers: ["Rocky Mountains", "Alps", "Himalayas", "Andes"], correct: 2 },
  ],
};

// Fisher-Yates shuffle - unbiased, unlike Array.sort(() => Math.random() - 0.5)
export function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Returns a fresh shuffled copy of the category's questions, each with its
// answers shuffled too and `correct` re-pointed at the new position.
// Never mutates questionBank itself.
export function prepareQuestions(category) {
  const original = questionBank[category] || [];
  const shuffled = shuffle(original);
  return shuffled.map((q) => {
    const correctAnswer = q.answers[q.correct];
    const newAnswers = shuffle(q.answers);
    return {
      ...q,
      answers: newAnswers,
      correct: newAnswers.indexOf(correctAnswer),
    };
  });
     }
