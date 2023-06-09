import {
  Project as ProjectWrapper,
  ProjectTitle,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";
import { userData } from "@/utils/userData";

interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
  deployUrl: string | undefined;
}

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos?sort=created&direction=desc`
      );

      const projects = [
        { name: "MangasKenzie-Joseph18CV",url: "https://joseph18cv.github.io/MangasKenzie-Joseph18CV/",},
        { name: "WebWomen-Joseph18CV", url: "https://joseph18cv.github.io/WebWomen-Joseph18CV/pages/home/" },
        { name: "OpenMusic-Joseph18CV", url: "https://joseph18cv.github.io/OpenMusic-Joseph18CV/pages/home/" },
        { name: "KenzieHub-Joseph18CV", url: "https://react-entrega-kenzie-hub-joseph18cv.vercel.app" },
        { name: "Hamburgueria2.0-Joseph18CV", url: "https://hamburgueria-2-0-kenzie-joseph18cv.vercel.app" },
        { name: "Control-finance-Joseph18CV", url: "https://joseph18cv.github.io/Control-finance-Joseph18CV/pages/home/" },
        { name: "Kenzie-Empresas-Joseph18CV", url: "https://joseph18cv.github.io/Kenzie-Empresas-Joseph18CV/" },
        { name: "NuKenzie-Joseph18CV", url: "https://react-entrega-s1-joseph18cv-1hcwpyeie-joseph18cv.vercel.app" },
      ];

      const json = await data.json();

      const mappedLanguages = json.map(async (repo: any) => {
        const languageData = await fetch(repo.languages_url);

        const dataJson = await languageData.json();

        projects.forEach((el) => {
          if (repo.name == el.name) {
            repo.deployUrl = el.url;
          }
        });

        return {
          ...repo,
          language: Object.keys(dataJson)[0],
        };
      });
      Promise.all(mappedLanguages).then((values) => {
        setRepositories(values);
      });

      return json;
    };

    fetchData();
  }, []);

  return (
    <>
      {repositories &&
        repositories?.map?.((repository) => (
          <ProjectWrapper key={repository.id}>
            <ProjectTitle
              as="h2"
              type="heading3"
              css={{ marginBottom: "$3" }}
              color="grey4"
            >
              {repository.name}
            </ProjectTitle>
            <ProjectStack>
              <Text type="body2" color="grey2">
                Linguagem primária:
              </Text>
              {repository.language ? (
                <ProjectStackTech>
                  <Text color="grey2" type="body2">
                    {repository.language}
                  </Text>
                </ProjectStackTech>
              ) : (
                <ProjectStackTech>
                  <Text color="grey2" type="body2">
                    Linguagem primária não identificada
                  </Text>
                </ProjectStackTech>
              )}
            </ProjectStack>

            <Text type="body1" color="grey2">
              {repository.description?.substring(0, 129)}
            </Text>
            <ProjectLinks>
              <ProjectLink target="_blank" href={repository.html_url}>
                <FaGithub /> Github Code
              </ProjectLink>
              {repository.homepage && (
                <ProjectLink
                  target="_blank"   
                  href={`https://${repository.homepage}`}
                >
                  <FaShare /> See demo
                </ProjectLink>
              )}
              {repository.deployUrl && (
                <ProjectLink target="_blank" href={repository.deployUrl}>
                  <IoMdRocket /> Deploy Link
                </ProjectLink>
              )}
            </ProjectLinks>
          </ProjectWrapper>
        ))}
    </>
  );
};
