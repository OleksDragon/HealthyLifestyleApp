import '../styles/widget.css';

function DiagramColumns({values, goal}) {
    return (
        <div className="week-chart">
            {values.map((value, index) => {
                const height = Math.min(
                    60,
                    Math.max(8, (value / goal) * 60)
                );
                const isGoal = value >= goal;

                return (
                    <div
                        key={index}
                        className={`ellipse ${isGoal ? "goal" : ""}`}
                        style={{ height: `${height}px` }}
                    />
                );
            })}
        </div>
    )
}

export default DiagramColumns;