require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors(), express.json());

app.post("/api/whois", async (req, res) => {
  const { domain } = req.body;
  const apiUrl = "https://www.whoisxmlapi.com/whoisserver/WhoisService";
  try {
    const resp = await axios.get(apiUrl, {
      params: {
        apiKey: process.env.WHOIS_API_KEY,
        domainName: domain,
        outputFormat: "JSON",
      },
    });
    const data = resp.data.WhoisRecord || {};

    // Handle case where domain is not found
    if (data.dataError === "MISSING_WHOIS_DATA") {
      return res.json({
        error: "Domain not found",
        domainName: domain,
        registrarName: "N/A",
        createdDate: "N/A",
        expiresDate: "N/A",
        estimatedDomainAge: "N/A",
        hostNames: "N/A",
        registrantName: "N/A",
        technicalContactName: "N/A",
        administrativeContactName: "N/A",
        contactEmail: "N/A",
      });
    }

    const info = {
      domainName: data.domainName,
      registrarName: data.registrarName,
      createdDate: data.createdDate,
      expiresDate: data.expiresDate,
      estimatedDomainAge: data.estimatedDomainAge,
      hostNames:
        (data.nameServers?.hostNames || []).join(",").slice(0, 25) +
        (data.nameServers?.hostNames?.length > 0 ? "..." : ""),
      registrantName: data.registrant?.name,
      technicalContactName: data.technicalContact?.name,
      administrativeContactName: data.administrativeContact?.name,
      contactEmail: data.contactEmail,
    };
    return res.json(info);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Whois lookup failed" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

