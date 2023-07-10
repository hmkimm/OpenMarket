import URL from "./URL";

const LogInAPI = async (userInput) => {
  try {
    // const handleLogIn = async () => { //note: 여기서는 왜 커스텀 훅 안에 함수 안썼음. (다른 곳에선 다 함수를 한 번 더 쓴 이유가 궁금. 왜냐면 어차피 return data 이런식으로 하면 되지 않나?)
    // => ProductAPI의 경우 fetchproducts 함수만 포함되어 있지만, 기능이 추가되면 다른 함수들도 쉽게 추가할 수 있습니다. 또한 반환된 객체를 통해 여러 함수들을 이름으로 호출할 수 있어서 이해하기 쉽고 사용하기 편리합니다.
    // 기능의 확장을 고려하지 않는다면 두 번째 코드도 나쁘지 않은 선택입니다.
    const res = await fetch(`${URL}/accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput), //memo: stringify({...userInput})안해도 됨. JSON 객체를 문자열로 변환하는 경우와 같은 상황에서는 굳이 복사 과정이 필요하지 않고, 복사에 따른 성능 저하와 메모리 사용 증가 때문에 원본 객체를 직접 사용하는 것이 더 효율적입니다.
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      return data;
    } else {
      throw new Error("id, pw가 일치하지 않습니다.");
    }
    // };
  } catch (error) {
    console.error("login api 응답 오류", error);
    throw error;
  }
};

export default LogInAPI;
