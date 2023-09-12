📁 (site) / components / AuthForm.tsx <br /> 
- 사용자 인증(로그인 및 회원가입)을 담당하는 컴포넌트 <br />
- variant : 현재 폼이 로그인 폼인지, 회원가입 폼인지 판단 <br />
 <br />
 
📁 (site) / page.tsx <br />
- useEffect 훅을 통해 컴포넌트가 마운트 될 때 sessionStorage에서 loginToken이라는 키를 가진 토큰을 가져온다. <br />
- 이 토큰을 사용해 사용자 정보를 요청한다. <br />
- 만약 사용자 정보 요청이 성공적으로 이루어지면 'about'페이지로 이동한다. <br />
- setTimeout을 이용하여 300ms뒤에 로딩상태를 false로 변경한다. <br />
- return에는 로딩 페이지가 구현되어있다. <br />
 <br />
 
📁 (site) / page.tsx <br />
- 사용자가 이미 로그인 되어 있는지 확인하고, 그에 다라 사용자에게 적절한 화면을 보여준다. <br />
<br />
 
📁 about / page.tsx <br />
- about이라는 컴포넌트를 정의하고 있다. <br />
- 로그인 한 상태에서만 접근 가능하다. (useEffect에 기능 구현 되어 있음. sessionStorage의 loginToken  확인) <br />
- handleLogout : 로그아웃 처리 (sessionStorage에서 loginToken 삭제) <br />
- 로그인 상태인지 확인하고, 로그아웃 기능을 제공하며, 로그인 상태에 따라 적절한 화면을 보여준다. <br />
<br />
 
📁 components / Button.tsx <br />
- 버튼 컴포넌트<br />
<br />
 
📁 components / Input.tsx <br />
- 인풋 컴포넌트<br />
<br />
 
📁 components / OAthButton.tsx <br />
- 소셜 로그인 버튼 컴포넌트<br />

