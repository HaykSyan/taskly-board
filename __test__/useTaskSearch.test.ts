import { useTaskSearch } from "@/app/(tasks)/hooks/useTaskSearch";
import { Task } from "@/app/(tasks)/schemas/taskSchema";
import { renderHook, act } from "@testing-library/react";
describe("useTaskSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it("returns the full task list when query is empty", () => {
    const initialTasks: Task[] = [
      { title: "Task 1", priority: "medium", completed: false },
      { title: "Another", priority: "medium", completed: false },
      { title: "Display List", priority: "medium", completed: false },
    ];

    const { result } = renderHook(
      ({ tasks }: { tasks: Task[] }) => useTaskSearch(tasks),
      {
        initialProps: {
          tasks: initialTasks,
        },
      }
    );

    // The hook should immediately return the full list for an empty query
    expect(result.current.filteredTasks).toEqual(initialTasks);
  });

  it("filters tasks based on the debounced query", () => {
    const initialTasks: Task[] = [
      { title: "Task 1", priority: "medium", completed: false },
      { title: "Another", priority: "medium", completed: false },
      { title: "Display List", priority: "medium", completed: false },
    ];

    const { result } = renderHook(
      ({ tasks }: { tasks: Task[] }) => useTaskSearch(tasks),
      { initialProps: { tasks: initialTasks } }
    );

    // set a query that should match only the first item
    act(() => {
      result.current.setQuery("Task 1");
    });

    // advance past the debounce delay (300ms in hook)
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.filteredTasks).toEqual([
      { title: "Task 1", priority: "medium", completed: false },
    ]);
  });
});
