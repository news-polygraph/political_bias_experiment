import NewsItem from "@/model/news-item";
import exampleNewsItem from "@/data/example-news-item.json";
import { TutorialTooltipStep } from "@/model/tutorial-tooltip-step";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import tutorialText from "./tutorial-text";
import getRandomClassNames from "@/helper/get-randomized-classnames";

let exampleItem: NewsItem = {...exampleNewsItem as NewsItem, randomizedImages: getRandomClassNames()};
//let exampleNewsItem: NewsItem = {...exampleNewsItem, randomizedImages: getRandomClassNames()}

const getTutorialPageForStep = (
  newsItem: NewsItem,
  {
    isInput,
    xaiFeatures,
    step,
    isRequired = false,
  }: {
    isInput: boolean;
    xaiFeatures: XAIFeatureLevel;
    step: TutorialTooltipStep;
    isRequired?: boolean;
  }
) => {
  const title = "Truthfulness Rating of News Items";
  const description =
    "Please read the news item carefully and adjust the truthfulness rating based on the information provided.";

  return {
    title,
    description,
    elements: [
      {
        type: "newsitem",
        hideNumber: true,
        name: `tutorial.${step}`,
        titleLocation: "hidden",
        newsitem: newsItem,
        xaiFeatures: xaiFeatures,
        isInput: isInput,
        isTutorial: true,
        tutorialTooltip: step,
        isRequired: isRequired,
      },
    ],
  };
};

const getTutorialPagesForNewsItem = (
  newsItem: NewsItem,
  xaiFeatures: XAIFeatureLevel
) => {
  return [
    getTutorialPageForStep(newsItem, {
      isInput: true,
      xaiFeatures: xaiFeatures,
      step: "overview",
    }),
    getTutorialPageForStep(newsItem, {
      isInput: false,
      xaiFeatures: "none",
      step: "article",
    }),
    getTutorialPageForStep(newsItem, {
      isInput: true,
      xaiFeatures: "none",
      step: "your-rating",
      isRequired: true,
    }),
    xaiFeatures === "visualizations" &&
      getTutorialPageForStep(newsItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "visualizations",
      }),
    xaiFeatures === "salient" &&
      getTutorialPageForStep(newsItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "readability",
      }),
    xaiFeatures === "salient" &&
      getTutorialPageForStep(newsItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "text-highlights",
      }),
    xaiFeatures === "salient" &&
      getTutorialPageForStep(newsItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "sentiment-highlights",
      }),
    xaiFeatures === "explanations" &&
      getTutorialPageForStep(newsItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "natural-language-explanation",
      }),
    getTutorialPageForStep(newsItem, {
      isInput: true,
      xaiFeatures: xaiFeatures,
      step: "redo-your-rating",
      isRequired: true,
    }),
  ];
};

const experimentPages = (xaiFeatures: XAIFeatureLevel) => {
  const tutorialTextPage = tutorialText(xaiFeatures);

  return [
    tutorialTextPage,
    ...getTutorialPagesForNewsItem(exampleItem as any, xaiFeatures),
  ];
};

export default experimentPages;
