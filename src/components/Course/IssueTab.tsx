import clsx from "clsx";

const testData = [
  {
    id: "123",
    issueName: "Issue 1",
    status: "Issued",
    cer: "url",
  },
  {
    id: "1233",
    issueName: "Issue 1",
    status: "Not yet",
  },
];

const IssueTab = () => {
  return (
    <div className="flex flex-1">
      <table className="table-auto w-full text-black">
        <thead className="bg-slate-200 h-10">
          <tr>
            <th className="text-left pl-5">List of Learners </th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {testData.map((item, index) => {
            return (
              <tr key={item.id} className="border-b h-12">
                <td className="text-left pl-5">{item.issueName}</td>
                <td
                  className={clsx(
                    "text-center font-bold",
                    item.status === "Issued" ? "text-green-400" : "text-red-400"
                  )}
                >
                  {item.status}
                </td>
                <td className="text-center">
                  {item.cer ? "Download" : "Pending"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTab;
