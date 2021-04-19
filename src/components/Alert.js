import React, { useEffect } from 'react'

export default function Alert({ alert, removeAlert, list }) {
  // Alert 출력(마운트)시 경고창 초기화 시키도록 처리
  useEffect(()=> {
    const timeout = setTimeout(()=> {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list])

  return (
    <p className={`alert alert-${alert.type}`}>
      {alert.msg}
    </p>
  )
}
