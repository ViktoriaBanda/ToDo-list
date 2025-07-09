import TodoInput from "./TodoInput";
import { fireEvent, render, screen } from "@testing-library/react";

describe("TodoInput", () => {
    const mockAdd = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("submit формы вызывает onAdd с текстом и очищает поле'", () => {
        render(<TodoInput onAdd={mockAdd}/>);

        const input = screen.getByPlaceholderText('Что нужно сделать?');
        const form = screen.getByTestId('todo-form');

        fireEvent.change(input, {target: {value: 'Task 1'}})
        fireEvent.submit(form);

        expect(mockAdd).toHaveBeenCalledWith('Task 1');
        expect(input).toHaveValue('');
    });

   test('submit формы с пустым текстом не вызывает onAdd', () => {
       render(<TodoInput onAdd={mockAdd}/>);
       const form = screen.getByTestId('todo-form');

       fireEvent.submit(form);
       expect(mockAdd).not.toHaveBeenCalled();
   })
})