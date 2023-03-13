import CourseDetail from "../../../components/Course/Detail";
import Container from "../../../components/_UI/Container";

type Props = {
  params: {
    publicKey: string;
  };
};

export default function DetailPage({ params: { publicKey } }: Props) {
  return (
    <Container>
      <CourseDetail publicKey={publicKey} />
    </Container>
  );
}
