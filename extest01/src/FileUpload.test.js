import FileUpload from "./FileUpload";
import { shallow } from "enzyme";

describe("FileUpload", () => {
  const component = shallow(<FileUpload />);

  it("should render a label and a file input field", () => {
    expect(component.find('input[type="file"]')).toExist();
    expect(component.find("label")).toExist();
  });

  it("should attach the label to the input field", () => {
    const id = "fileUpload";
    expect(component.find("input").prop("id")).toBe(id);
  });
});
