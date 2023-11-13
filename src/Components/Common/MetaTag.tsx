import { Helmet } from "react-helmet-async";

interface MetaProps {
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  imageWidth?: string;
  imageHeight?: string;
}
const MetaTag = (props: MetaProps) => {
  return (
    <Helmet>
      <title>{props.title}</title>

      <meta name="description" content={props.description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:site_name" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={props.url} />
      <meta property="og:image" content={props.imageUrl} />
      <meta property="og:image:width" content={props.imageWidth} />
      <meta property="og:image:height" content={props.imageHeight} />

      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.imageUrl}/>

      <link rel="canonical" href={props.url} />
    </Helmet>
  );
};

export default MetaTag;
