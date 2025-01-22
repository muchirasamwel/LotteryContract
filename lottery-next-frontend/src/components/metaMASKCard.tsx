import { useEffect, useState } from "react";

import { metaMask, hooks } from "@/utils/connectors/metaMASK";
import { Card } from "./Card";

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  hooks;

const MetaMaskCard = () => {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();

  const [error, setError] = useState(undefined);

  useEffect(() => {
    metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  return (
    <Card
      connector={metaMask}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
    />
  );
};

export default MetaMaskCard;
