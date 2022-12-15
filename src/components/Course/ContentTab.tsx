const test = [
  {
    lessionId: "123",
    lessionName: "Lession 1: dissecting the human body",
    step: [
      {
        stepId: "123",
        stepName: "Step 1: Prepare the frog",
      },
      {
        stepId: "1233",
        stepName: "Step 2: Prepare the frog 2",
      },
    ],
  },
  {
    lessionId: "1234",
    lessionName: "Lession 2: dissecting the human body 2",
    step: [
      {
        stepId: "123",
        stepName: "Step 1: Prepare the frog",
      },
      {
        stepId: "1233",
        stepName: "Step 2: Prepare the frog 2",
      },
    ],
  },
];
const ContentTab = () => {
  return (
    <div className="">
      {test.map((item) => {
        return (
          <div key={item.lessionId} className="flex flex-col flex-1 mt-5">
            <div className="flex flex-row flex-1 items-center py-2 px-5 bg-slate-200 text-black rounded-md justify-between">
              {item.lessionName}
              <div>
                <svg
                  width="14"
                  height="18"
                  viewBox="0 0 16 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.29289 21.7071C7.68342 22.0976 8.31658 22.0976 8.70711 21.7071L15.0711 15.3431C15.4616 14.9526 15.4616 14.3195 15.0711 13.9289C14.6805 13.5384 14.0474 13.5384 13.6569 13.9289L8 19.5858L2.34315 13.9289C1.95262 13.5384 1.31946 13.5384 0.928932 13.9289C0.538408 14.3195 0.538408 14.9526 0.928932 15.3431L7.29289 21.7071ZM7 0L7 21H9L9 0L7 0Z"
                    fill="#959595"
                  />
                </svg>
              </div>
            </div>
            {item.step.map((step) => {
              return (
                <div
                  key={step.stepId}
                  className="flex flex-row flex-1 items-center py-2 px-5 text-black"
                >
                  {step.stepName}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ContentTab;
