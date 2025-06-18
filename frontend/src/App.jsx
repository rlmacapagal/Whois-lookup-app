import { useState } from "react";

export default function App() {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("domain");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    // Check if the domain is already cached
    if (cache[domain]) {
      setResult(cache[domain]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/whois", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, type }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      // Cache the result
      setCache((prevCache) => ({ ...prevCache, [domain]: data }));
      console.log(cache, "cache");
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex  justify-center w-screen h-screen bg-gray-100 ">
      <div className=" w-full p-4 mb-4">
        <h1 className="text-5xl mb-8 text-center">Whois Lookup</h1>
        <input
          className="border p-2 w-1/5 mb-2 mx-auto block"
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <select
          className="border p-2 mb-4 w-1/5 mx-auto block"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="domain">Domain Info</option>
          <option value="contact">Contact Info</option>
        </select>
        <button
          className="
    bg-gradient-to-r 
    from-blue-400      
    via-purple-500     
    to-red-500 
    text-white 
    px-4 
    py-2 
    rounded-full 
    w-[10%]
    mx-auto 
    block 
    transition-all 
    duration-200
    flex 
    items-center 
    justify-center
  "
          onClick={lookup}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            "Lookup"
          )}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {result && (
          <div className="mt-4 w-full mx-auto flex justify-center">
            {type === "domain" ? (
              <table className="table-auto w-4/5 border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="border border-black bg-white px-2 py-1 font-medium min-h-[50px]">
                      Domain Name
                    </th>
                    <th className="border border-black bg-white px-2 py-1 font-medium min-h-[50px]">
                      Registrar
                    </th>
                    <th className="border border-black bg-white px-2 py-1 font-medium min-h-[50px]">
                      Registration Date
                    </th>
                    <th className="border border-black bg-white px-2 py-1 font-medium min-h-[50px]">
                      Expiration Date
                    </th>
                    <th className="border border-black bg-white px-2 py-1 font-medium min-h-[50px]">
                      Estimated Domain Age
                    </th>
                    <th className="border border-black bg-white px-2 py-1 font-medium min-h-[50px]">
                      Hostnames
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black bg-white px-2 py-1 h-[30px]">
                      {result.domainName || ""}
                    </td>
                    <td className="border border-black bg-white px-2 py-1 h-[30px]">
                      {result.registrarName || ""}
                    </td>
                    <td className="border border-black bg-white px-2 py-1 h-[30px]">
                      {result.createdDate || ""}
                    </td>
                    <td className="border border-black bg-white px-2 py-1 h-[30px]">
                      {result.expiresDate || ""}
                    </td>
                    <td className="border border-black bg-white px-2 py-1 h-[30px]">
                      {result.estimatedDomainAge || ""}
                    </td>
                    <td className="border border-black bg-white px-2 py-1 h-[30px]">
                      {result.hostNames || ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="table-auto w-4/5 border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="border border-black bg-white px-2 py-1 font-medium h-[30px]">
                      Registrant Name
                    </th>
                    <th className="border border-black bg-white px-2 py-1 font-medium h-[30px]">
                      Technical Contact Name
                    </th>
                    <th className="border border-black bg-white px-2 py-1 font-medium h-[30px]">
                      Administrative Contact Name
                    </th>
                    <th className="border border-black bg-white px-2 py-1 font-medium h-[30px]">
                      Contact Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black bg-white px-2 py-1 h-[30px]">
                      {result.registrantName || ""}
                    </td>
                    <td className="border border-black bg-white px-2 py-1 h-[30px]">
                      {result.technicalContactName || ""}
                    </td>
                    <td className="border border-black bg-white px-2 py-1 h-[30px]">
                      {result.administrativeContactName || ""}
                    </td>
                    <td className="border border-black bg-white px-2 py-1 h-[30px]`">
                      {result.contactEmail || ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

