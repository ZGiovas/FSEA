import { TableProps, Tooltip, Typography } from "antd";
import { useMemo } from "react";
import { EFOTerm, EFOSynonym } from "../../../types/efo-terms";

const { Paragraph } = Typography;

const useEfoColumns = () => {
  return useMemo<TableProps<EFOTerm>["columns"]>(
    () => [
      {
        title: "Ontology ID",
        dataIndex: "ontology_id",
        sorter: true,
        width: 150,
        fixed: "left",
      },
      {
        title: "Label",
        dataIndex: "label",
        sorter: true,
        width: 200,
      },
      {
        title: "Description",
        dataIndex: "description",
        sorter: true,
        width: 300,
        render: (description: string) => {
          if (!description) return "N/A";

          return (
            <Tooltip title={description}>
              <Paragraph
                ellipsis={{ rows: 3, expandable: false, tooltip: false }}
                style={{ marginBottom: 0 }}
              >
                {description}
              </Paragraph>
            </Tooltip>
          );
        },
      },
      {
        title: "OBO ID",
        dataIndex: "obo_id",
        sorter: true,
        width: 150,
        render: (obo_id: string | null) => obo_id || "N/A",
      },
      {
        title: "IRI",
        dataIndex: "iri",
        width: 250,
        render: (iri: string) => (
          <a href={iri} target="_blank" rel="noopener noreferrer">
            {iri}
          </a>
        ),
      },
      {
        title: "Language",
        dataIndex: "lang",
        width: 120,
      },
      {
        title: "Is Obsolete",
        dataIndex: "is_obsolete",
        width: 120,
        filters: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        render: (is_obsolete: boolean) => (is_obsolete ? "Yes" : "No"),
      },
      {
        title: "Has Children",
        dataIndex: "has_children",
        width: 120,
        filters: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        render: (has_children: boolean) => (has_children ? "Yes" : "No"),
      },
      {
        title: "Is Root",
        dataIndex: "is_root",
        width: 120,
        filters: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        render: (is_root: boolean) => (is_root ? "Yes" : "No"),
      },
      {
        title: "Synonyms",
        dataIndex: "synonyms",
        width: 300,
        render: (synonyms: EFOSynonym[] | undefined) =>
          synonyms && synonyms.length > 0
            ? synonyms.map((s) => s.synonym).join(", ")
            : "N/A",
      },
    ],
    []
  );
};

export default useEfoColumns;
