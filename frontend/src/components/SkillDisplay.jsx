const SkillDisplay = ({ matched = [], missing = [] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <div>
      <h3 className="font-bold text-green-600 mb-2">Matched Skills</h3>
      <ul>
        {matched.map((skill) => (
          <li key={skill} className="bg-green-100 rounded p-2 my-1">{skill}</li>
        ))}
      </ul>
    </div>
    <div>
      <h3 className="font-bold text-red-600 mb-2">Missing Skills</h3>
      <ul>
        {missing.map((skill) => (
          <li key={skill} className="bg-red-100 rounded p-2 my-1">{skill}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default SkillDisplay; 