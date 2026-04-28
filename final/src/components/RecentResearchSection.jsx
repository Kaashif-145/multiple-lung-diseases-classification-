import React, { useEffect, useState } from "react";

const RecentResearchSection = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = "pulmonary disease lung fibrosis machine learning";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const esearchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi
          ?db=pubmed&retmode=json&term=${encodeURIComponent(query)}&retmax=5&sort=pub+date`
          .replace(/\s+/g, "");

        const esRes = await fetch(esearchUrl);
        const esJson = await esRes.json();
        const idList = esJson.esearchresult.idlist;

        if (!idList || idList.length === 0) {
          setLoading(false);
          return;
        }

        const efetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi
          ?db=pubmed&retmode=json&id=${idList.join(",")}`
          .replace(/\s+/g, "");

        const efRes = await fetch(efetchUrl);
        const efJson = await efRes.json();

        const formatted = idList.map((id) => ({
          id,
          title: efJson.result[id].title,
          date: efJson.result[id].pubdate,
          journal: efJson.result[id].fulljournalname,
          link: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
        }));

        setPapers(formatted);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-lg font-semibold text-gray-900 mb-6">Latest Research</h2>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading research...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

            {papers.map((paper) => (
              <a
                key={paper.id}
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <h3 className="text-sm text-gray-800 font-medium group-hover:text-green-700 transition">
                  {paper.title}
                </h3>

                <div className="w-8 h-[2px] bg-gray-300 my-2 group-hover:bg-green-500 transition"></div>

                <p className="text-xs text-gray-500">{paper.journal}</p>
                <p className="text-xs text-gray-400">{paper.date}</p>
              </a>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default RecentResearchSection;
