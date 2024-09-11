const Welcome = () => {
  return (
    <s-container>
      <div className="flex justify-content-end">
            <button className="ghost-blue icon-leading"><s-icon name='user'></s-icon>Add a user to help setup Avalara</button>
      </div>
      <div className="welcome">
        <h1>
          Welcome to the <span>React</span> Quiz!
        </h1>
        <p>Test your knowledge with this quiz about React.</p>
      </div>
    </s-container>
  );
};
