import { useEffect, useState } from "react";

export default function UseSpeakers() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.airtable.com/v0/appnQEwZAdx5IMh1D/data/`, {
      headers: {
        Authorization: "Bearer keyxEatu80zNNkZ6z"
      }
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw Error("Could not fetch Modal data");
        }
        return response.json();
      })
      .then((json) => {
        setData(json.records.find((d) => d.fields.enabled).fields);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return { data, isLoading };
}
