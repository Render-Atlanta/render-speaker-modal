import { useEffect, useState } from "react";

export default function UseSpeakers(param = 12) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/appyFLHNO3CzR6Pqo/speakers?maxRecords=${param}`,
      {
        headers: {
          Authorization: "Bearer keyxEatu80zNNkZ6z"
        }
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw Error("Could not fetch Speaker data");
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        // setIsLoading(false)
      });
  }, [param]);

  return { data, isLoading };
}
