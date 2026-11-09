import { Button } from "@/ui/button";

export default function SideBarItem(props: { title: string; link?: string }) {
  const { link, title } = props;

  return <Button>{title}</Button>;
}
